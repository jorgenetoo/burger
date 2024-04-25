import * as Yup from 'yup';
import Jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' });
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await user.checkPassword(password))) {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' });
    }

    return response.json({
      id: user.id,
      email: user.email,
      name: user.name,
      admin: user.admin,
      token: Jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

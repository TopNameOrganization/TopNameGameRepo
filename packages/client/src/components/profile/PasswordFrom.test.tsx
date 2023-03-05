import * as renderer from 'react-test-renderer';
import { PasswordForm } from './PasswordFrom';

describe('Password form', () => {
  const useForm = true;

  it('should renders password form correctly', () => {
    const tree = renderer
        .create(<PasswordForm noUseForm={useForm} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

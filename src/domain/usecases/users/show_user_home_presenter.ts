import User from '#models/user'

export default class ShowUserHomePresenterUsecase {
  // I just moved this method to the use case, but we could also use an
  // interface to invert the dependency, allowing us to switch to another
  // presenter like XML in the future.
  execute(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }
  }
}

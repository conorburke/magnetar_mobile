export const profileMutation = `mutation UpdateUser($first_name: String, $last_name: String, $email: String, $phone_number: String) {
  updateUser(first_name: $first_name, last_name: $last_name, email: $email phone_number: $phone_number) {
    first_name
    email
  }
}`;

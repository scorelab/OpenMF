from password_strength import PasswordPolicy

def check_password_strength(password):
  policy = PasswordPolicy.from_names(
    length=8,  # min length: 8
    uppercase=1,  # need min. 1 uppercase letter
    numbers=1,  # need min. 1 digit
    special=1,  # need min. 1 special character
  )
  result = policy.test(password)
  return result
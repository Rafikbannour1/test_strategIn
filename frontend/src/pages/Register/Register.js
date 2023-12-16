import React from 'react'
import '../../common/styles/form.css' ; 
const Register = () => {
  return (
    <div id="feedback-form">
  <h2 class="header">Register</h2>
  <div>
    <form>
      <input type="text" name="email" placeholder="Email"></input>
      <input type="text" name="name" placeholder="Name"></input>
      <input type="password" name="name" placeholder="Passwod"></input>
      <input type="password" name="name" placeholder="confirmPassword"></input>
      <label for="feedback-notify">Remind me about this event via SMS</label>
      <input type="checkbox" id="feedback-notify" name="notify" />
      <input type="text" id="feedback-phone" name="phone" placeholder="Phone number"></input>
      <button type="submit">Register</button>
    </form>
  </div>
</div>
  )
}

export default Register
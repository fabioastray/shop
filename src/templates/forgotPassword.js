module.export = (toEmail) => {
  return {
    subject: `NodeAuthTuts | Password reset`,
    to: toEmail,
    from: `NodeAuthTuts `,
    html: `
              <h1>Hi,</h1>
              <h2>Here is your password reset key</h2>
              <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
              <p>Please ignore if you didn't try to reset your password on our platform</p>
            `
  }
}
export class NotFound extends Error {
    constructor() {
      super()
  
      this.name = 'NotFound'
    }
  }
  
  export class AlreadyExists extends Error {
    constructor() {
      super()
  
      this.name = 'AlreadyExists'
    }
  }
  
  export class UsernameExists extends Error {
    constructor() {
      super()
      this.name = 'UsernameExists'
    }
  }
  
  export class EmailExists extends Error {
    constructor() {
      super()
      this.name = 'EmailExists'
    }
  }
  
  export class PasswordsNotMatching extends Error {
    constructor() {
      super()
      this.name = 'PasswordsNotMatching'
    }
  }
  
  export class UserInfoMissing extends Error {
    constructor() {
      super()
      this.name = 'UserInfoMissing'
    }
  }
  
  export class Unauthorized extends Error {
    constructor() {
      super()
      this.name = 'Unauthorized'
    }
  }
export function generateUniqueEmail() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${randomString}@yopmail.com`
  }
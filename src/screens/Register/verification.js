export const verifyEmptyFields = async user => new Promise((resolve, reject) => {
  const userKeys = Object.keys(user);

  userKeys.map((key) => {
    if (user[key] === '') {
      reject(new Error('Preecha todos os capos'));
    }
    return key;
  });
  resolve();
});

export const verifyAcceptedTerms = async ({ acceptTerms }) => new Promise((resolve, reject) => {
  if (acceptTerms) {
    resolve();
  }

  reject(new Error('Você precisa aceitar os termos de uso.'));
});

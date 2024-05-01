interface CommonMessages {
  fn: {
    familyName: (resource: string) => string;
  };
}

const commonMessages: CommonMessages = {
  fn: {
    familyName: (resource) => `Welcome to ${resource} family`,
  },
};

export { commonMessages };

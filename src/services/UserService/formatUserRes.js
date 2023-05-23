const formatUserRes =  async (user) => {
  return {
    id: user._id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    created_at: user.created_at,
    updated_at: user.updated_at,
    birth: user.birth,
  };
};

export default formatUserRes;

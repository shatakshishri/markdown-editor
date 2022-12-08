class UserDTO{
    _id;
    displayName;
    provider;
    email;
    avatar;
    constructor(data){
        this._id = data?._id;
        this.displayName = data?.displayName;
        this.email = data?.email;
        this.avatar = data?.avatar;
        this.provider = data?.provider;
    }
}

module.exports = UserDTO;
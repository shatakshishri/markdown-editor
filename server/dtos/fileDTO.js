class FileDTO{
    _id;
    fileId;
    data;
    userId;
    name;
    createdAt;
    updatedAt;
    constructor(data){
        this._id = data?._id;
        this.fileId = data?.fileId;
        this.data = data?.data;
        this.name = data?.name
        this.userId = data?.userId;
        this.createdAt = data?.createdAt;
        this.updatedAt = data?.updatedAt;
    }
}

module.exports = FileDTO;
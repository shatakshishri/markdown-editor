const FileModel = require("../model/file");
const FileDTO = require("../dtos/fileDTO");
const { verifyBody } = require("../utils/verifyBody");

class FileController {
  async getFile(data) {
    if (!verifyBody(data, ["fileId", "userId"])) return null;
    try {
      let file;
      file = await FileModel.findOne({ fileId: data?.fileId });
      if (!file) {
        file = await FileModel.create(data);
      }
      return new FileDTO(file);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(data) {
    if (!data) return null;
    if (!verifyBody(data, ["fileId", "data"])) return null;
    try {
      return await FileModel.updateOne(
        { fileId: data?.fileId },
        { data: data?.data }
      );
    } catch (error) {}
  }

  async getAllFiles(req, res) {
    const userId = req.user._id;
    try {
      const files = await FileModel.find({ userId }).sort({ updatedAt: -1 });
      return res.status(200).json({ files });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }

  async renameFile(req, res) {
    if (!verifyBody(req.body, ["fileId", "name"])) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      await FileModel.updateOne(
        {
          fileId: req.body.fileId,
        },
        { name: req.body.name }
      );
      return res.status(200).json({msg: 'success'})
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
}

module.exports = new FileController();

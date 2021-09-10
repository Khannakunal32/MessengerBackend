const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  getMyChatData,
	getUserByUserEmail,
	getUserByUserIdNew,
	storeMyNtoken,
	getNotification,
	getSeenStatus,
	getLastChatForMe,
	purgeChats,
	deleteChats,
	showUserEmailById,
	storePurchasedOrder,
	showPurchasedOrder
} = require("./user.controller");
router.get("/", getUsers);
router.post("/", createUser);
// router.get("/:id", checkToken, getUserByUserId);
router.get("/:id",  getUserByUserId);
router.post("/veroKeytestingrandom676767",getUserByUserIdNew);
router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
router.patch("/updateuser", updateUsers);
router.delete("/", checkToken, deleteUser);
router.post('/getMyChatData',getMyChatData);
router.post('/getLastChatForMe',getLastChatForMe);

router.post("/getUserByUsinternalr87v4v",getUserByUserEmail);
router.post("/storeMyNtoken", storeMyNtoken);
router.post("/getNotification", getNotification);
router.post("/getSeenStatus", getSeenStatus);
router.post("/purgeChats", purgeChats);
router.post("/deleteChats", deleteChats);
router.post("/showUserEmailById", showUserEmailById);

router.post("/storePurchasedOrder", storePurchasedOrder);
router.post("/showPurchasedOrder", showPurchasedOrder);



module.exports = router;

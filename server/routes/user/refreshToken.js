const router = require("express").Router();
const Settings = require("../../models/settings");
const { verifyToken, issueToken } = require("../../lib/JWTUtils");

router.post("/", async (req, res, next) => {

	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) throw Error("Refresh Token Required");

		const payload = await verifyToken(refreshToken);

		// Check if it is a refresh token
		if (payload.tokenType !== "refresh") throw Error("Invalid Token");

		// check if the token is expired
		if (payload.exp * 1000 >= Date.now()) {
			// Find the user with that Id
			const user = await Settings.findOne({ userId: payload.userId });

			if (!user) throw Error("User Not Found");

			if (!user.verified) throw Error("Please Verify your account by email");

			// Find the index of that refreshToken in memory
			const index = user.sessions.findIndex(
				(session) => session.refreshToken === refreshToken
			);

			// If not exits
			if (index === -1)
				throw Error(
					"Your account may compromised. Please login again. And also remove your session"
				);

			if (!user.sessions[index].verified)
				throw Error("Please Conferm your session with the email address");

			// Create Refresh and Access Token
			const newRefreshToken = await issueToken(
				{ userId: user.userId, userType: user.userType, tokenType: "refresh" },
				"180d"
			);
			const newAccessToken = await issueToken(
				{ userId: user.userId, userType: user.userType, tokenType: "access" },
				"300m"
			);

			// Setting refresh token to cookie
			res.cookie("refreshToken", newRefreshToken, {
				maxAge: 15552000000,
				httpOnly: true,
				//  secure: true,  // This will be in production
				path: '/api/user'
			});

			

			// Store refresh token in DB
			//user.sessions[index].refreshToken = newRefreshToken;

			// Update refresh token of that sessions
			await Settings.findOneAndUpdate({userId: user.userId} , { $set: { [`sessions.${index}.refreshToken`] : newRefreshToken }})

			// Send the response with the access Token
			res.json({
				success: true,
				accessToken: `Bearer ${newAccessToken}`,
				msg: "Access Token is given.",
			});
		} 
		else throw Error("Token Expired");
	} 
	catch (err) {
		const errors = {
			status: 403,
			message: err.message,
		};
		return next(errors);
	}
});

module.exports = router;

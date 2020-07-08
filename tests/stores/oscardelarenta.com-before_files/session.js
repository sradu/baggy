var g_sessionCookie = readCookie("SessionID");

if (g_sessionCookie === undefined || g_sessionCookie === null || g_sessionCookie === "") {

	$.ajax({
		async: false,
		type: "GET",
		url: "/api/Session/Start?url=" + encodeURIComponent(document.location) + "&referrer=" + encodeURIComponent(document.referrer),
		success: function (msg) {
			if (msg.Success) {
				createCookie("SessionID", msg.Data.SessionID, 1);
				if (msg.Data.IsNew) console.log("Session started.");
			}
			else {
				console.error(msg.ErrorMessage);
			}
		},
		error: function (error) {
			console.error(error);
		}
	});
}
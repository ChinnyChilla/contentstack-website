const message_body = "* Thank you <@USB6ZH93K|macleena.rodrigues> for your <@ABCD234|hello> continuous <@FKLEJLKF|noname.james> support and for going out of your way for our Timeline release*"
const recipients = ["USB6ZH93K"];
const slack_users = [{
	"title": "USB6ZH93K",
	"display_name": "testing"
}, {
	"title": "ABCD234",
	"display_name": "michael"
}];

// Create a mapping of user ID to display name
const userMapping = {};
slack_users.forEach(user => {
	userMapping[user.title] = user.display_name;
});

// Function to replace user mentions in the message body
const replaceUserMentions = (message, userMap) => {
	return message.replace(/<@([A-Z0-9]+)\|([^>]+)>/g, (match, userId, username) => {
		const displayName = userMap[userId] || username;
		return `<b>@${displayName}</b>`;
	});
};
const modified_message_body = replaceUserMentions(message_body, userMapping);
console.log(modified_message_body);
var temp = ":rocket:&lt;@U02ECUABQMS&gt; shares a Boost of 100 PhinPoints ! :rocket: \
* & lt; @U01AXK05HQ8| kristina.dudley & gt; Thank you for adding one more meeting to your calendar to open the communication between finance and marketing.It is great having a second set of eyes on the coding for budgets and place to go with questions.* \
	Living our value: : sunflower: Tribe: sunflower: !value image Phin Leaderboard! button Donate Your Boost! button"
var reg = /:rocket:.*?:rocket:(.*?)Living our value:/
var emojiReg = /:\w+:/g

var message_content = temp.match(reg)[1];
var no_reaction_message = message_content.replace(emojiReg, '')
console.log(no_reaction_message)


const Alexa = require("alexa-sdk");

const handlers = {

	WellRestedIntent () {
	
		const slotValue = this.event.request.intent.slots.NumberOfHours.value;
		const numOfHours = parseInt(slotValue);
		
		if (Number.isInteger(numOfHours)) {
		
			let speech;
			if (numOfHours > 12) {
				speech = "I think you may sleep too much and swing back to tired.";
			} else if(numOfHours > 8) {
				speech = "You should wake up refreshed.";
			} else if (numOfHours > 6) {
				speech = "You may get by, but watch out for a mid-day crash.";
			} else {
				speech = "You'll be dragging tomorrow. Get the coffee ready!";
			}
			
			this.emit(":tell", speech);
		} else {
			
			console.log(`Slot value: ${slotValue}`);
			
			const prompt = "I'm sorry, I heard something that doesn't seem like" + 
							 " a number. How many hours of sleep do you want?";
			const reprompt = "Tell me how many hours you plan to sleep."; 
			
			this.emit(":ask", prompt, reprompt);
		}
		
	},
	
	SleepQualityIntent() {
		this.emit(":tell", "Sleep quality intent!");
		
		const quality = this.event.intent.slots.PreviousNightQuality.value;
		const good = ["good", "well", "wonderfully", "a lot", "amazing", "fantastic", "o.k.", "great"];
		const bad = ["bad", "poorly", "little", "very little", "not at all", "horribly"];
		
		let speech;
		
		if (good.includes(quality)) {
			speech = "Let's keep the great sleep going!";		
		} else if (bad.includes(quality)) {
			speech = "I hope tonight is better for you.";
		} else {
			speech = "I've got a good feeling about your sleep tonight";
		}
		
		this.emit(":tell", speech);
	}

};

exports.handler = function(event, context, callback) {

	const alexa = Alexa.handler(event, context, callback);
	
	alexa.appId = "amzn1.ask.skill.0da2f3bb-d878-46c6-84a9-54f08dd883cc";
	
	alexa.registerHandlers(handlers);
	alexa.execute();
	
};
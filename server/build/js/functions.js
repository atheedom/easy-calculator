


	document.addEventListener("DOMContentLoaded", function () {
		var buttons = document.querySelectorAll("section li");	
		for (var i=0, l=buttons.length; i<l; i++) {				
			console.log('setListener: ' + buttons.length);			
			buttons[i].addEventListener("click", retriveOperator);
		};
	});

	var errorId = null;
	var panel = null;
	var clearError = false;
	var clearResults = false;
	var messageId = null;
	
function initialize(){
	console.log('initialize');
	panel = document.querySelector("#panel");
	errorId = document.getElementById("error");	
	messageId = document.getElementById("message");
}


function retriveOperator(elt){
	var value = this.getAttribute("data-value");
	console.log('value: '+ value);
	
	var panel = document.querySelector("#panel");
	if (panel.textContent.length > 8){					
		errorId.style.visibility = 'visible';
		messageId.innerHTML = "The results panel is too small to display the number. Try pressing D (delete one number) or C (to clear all).";
		clearError = true;
	}
	
	if (clearResults) {
		clearPanel();
		clearResults = false;
	}
		
	if(value == "=" && !clearError){
		evaluate();
	} else if (value == "C"){
		clearPanel();
	} else if (value == "D"){
		deleteNumber();
	} else if (value == "R"  && !clearError){
		evaluateRadical();
	} else if (value == "%"  && !clearError){
		evaluatePercentage();
	} else if (!clearError){
		updatePanel(value);
	}
}


function updatePanel(value){
	var results = panel.textContent;
	console.log('results: '+ results);
	panel.textContent = results + value;
}


function deleteNumber(){
	console.log('deleteNumber');	
	clearErrorPanel();	
	var calc = panel.textContent;
	calc = calc.substring(0, calc.length-1);
	panel.textContent = calc;	
}		
			
function clearPanel(){
	console.log('clearPanel');
	clearErrorPanel();
	panel.textContent = "";	
}

function clearErrorPanel(){
	console.log("errorPanel: " + clearError);	
	if ( clearError ){
		clearError = false;		
		errorId.style.visibility =  'hidden';
	}
}

function evaluatePercentage(){
	console.log('evaluatePercentage');
	var calc = panel.textContent;	
	if(calc != null && calc.length){
		var result = "";
		try {
			result = eval(calc);
			result = result*100;
		} catch (err) {
			result = 'ERROR';
			clearResults = true;
		}
		panel.textContent = result + '%';
	}
}

function evaluateRadical(){
	console.log('evaluateRadical');
	var calc = panel.textContent;
	if(calc != null && calc.length){
		var result = "";
		try {
			result = eval(calc);
			result = Math.sqrt(result);
		} catch (err) {
			result = 'ERROR';
			clearResults = true;
		}
		panel.textContent = result;
	}
}

function evaluate(){
	console.log('evaluate');
	var calc = panel.textContent;
	if(calc != null && calc.length){
		var result = "";
		try {
			result = eval(calc);
		} catch (err) {
			result = 'ERROR';
			clearResults = true;
		}
		panel.textContent = result;
	}
}

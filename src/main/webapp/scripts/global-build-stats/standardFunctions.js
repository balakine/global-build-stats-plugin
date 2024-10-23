function fieldFilterTypeSelected(selectedType, regexInputFieldId, filterHiddenInputFieldId){
	if(FIELD_FILTER_ALL == selectedType){
		document.getElementById(regexInputFieldId).disabled = true;
		document.getElementById(filterHiddenInputFieldId).value = FIELD_FILTER_ALL;
	} else if(FIELD_FILTER_REGEX == selectedType){
		document.getElementById(regexInputFieldId).disabled = false;
		document.getElementById(filterHiddenInputFieldId).value = FIELD_FILTER_REGEX+'('+document.getElementById(regexInputFieldId).value+')';
	} else if(selectedType.indexOf(FIELD_FILTER_REGEX) != -1){
		document.getElementById(regexInputFieldId).disabled = true;
		document.getElementById(filterHiddenInputFieldId).value = selectedType;
	}
}
	
function initializeRegexField(targetField, regex){
	var extractingRegex = new RegExp("^"+FIELD_FILTER_REGEX+"\\((.*)\\)$", "g");
	if(extractingRegex.test(regex)){
		extractingRegex.exec(regex);
		var regexToPut = RegExp.$1;
		document.getElementById(targetField).value = regexToPut;
	}
}

// Reinventing the wheel since in hudson-behavior.js we MUST
// use a <tr> and <td> field for the validation-error-area container :(
// So registerValidator implementation is recopied here
function validateField(field){
    var validationErrorAreaClassName = field.getAttribute("validationErrorAreaClassName");

    var targetValidationError = findFollowingSPAN(field);
    var url = field.getAttribute("checkUrl") + "?value=" + encodeURIComponent(field.value);

    var method = field.getAttribute("checkMethod");
    if (!method) method = "get";
	
    FormChecker.sendRequest(url, {
        method : method,
        onComplete : function(x) {
			x.text().then((responseText) => {
				targetValidationError.innerHTML = responseText;
			})
        }
    });
}

function findFollowingSPAN(input) {
    const container = input.closest(".gbs-form-row");
    return container.querySelector(`span[data-id="${input.id}"`)
}

function isDivErrorPresentInForm(myForm){
	var elems = myForm.getElementsByClassName("error");
	var divErrorPresent = false;
	var i=0;
	while(i<elems.length && !divErrorPresent){
		divErrorPresent = (elems[i].tagName == "DIV");
		i++;
	}
	return divErrorPresent;
}

// Hudson hack allowing to override the form.onsubmit generated by hudson-behaviour with
// a divError check
var myHudsonRules = {
	"FORM" : function(form){
        form.onsubmit = function() { return !isDivErrorPresentInForm(this); };
        form = null; // memory leak prevention
	}
};

function generateErrorMessage(message){
	// TODO: fix this "6d8c7ad0" absolute link !
	return `<div class="error jenkins-!-margin-bottom-3">${message}</div>`;
}

Behaviour.register(Object.assign(hudsonRules, myHudsonRules));
Behaviour.apply();

Behaviour.specify(".gbs-fieldFilter", "gbs-fieldFilter", 0, function(element) {
  element.onchange = function() {
    fieldFilterTypeSelected(element.value, element.dataset.regexField, element.dataset.hiddenField);
  }
});

Behaviour.specify(".gbs-regex-blur", "gbs-regex-blur", 0, function(element) {
  element.onblur = function() {
    const id = element.dataset.id
    document.getElementById(id).value = FIELD_FILTER_REGEX + '(' + element.value + ')';
  }
});


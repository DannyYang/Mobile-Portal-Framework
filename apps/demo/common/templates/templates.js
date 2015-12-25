/**
 * UI Templates
 */

var MPF_Template = {
	// 目前使用的Template清單
	templateList : ["personTemplate"],
	// 初始化Template元件
	init : function(){
		console.log("on init");
		$.get($.MPF.host+"templates/templates.html", function(data) {
			$("#MPF_TemplateArea").html(data);
			for(var i=0, max=MPF_Template.templateList.length; i<max; i++) {
				var templateName = MPF_Template.templateList[i];
				$.templates(templateName, "#"+templateName);
			}
		});
	}
};
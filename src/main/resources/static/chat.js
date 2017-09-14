$(function() {
    'use strict';

    var client;
    $( document ).ready(function() {
    	$("#send").prop("disabled", true);
    	$('#text').prop('disabled', true);
    	$("#conversation").hide();
    	$("#messages").html("");
    });
    
    
    function showMessage(mesg)
    {
	$('#messages').append('<tr>' +
			      '<td>' + mesg.message + '</td>' +
			      '<td>' + getDateFormat(mesg.time) + '</td>' +
			      '</tr>');
    }

    $("form").on('submit', function (e) {
	e.preventDefault();
    });
    
    $('#connect').click(function() {
    	client = Stomp.over(new SockJS('/chat'));
    	client.connect({}, function (frame) {
    		
    	    setConnected(true);
    	    
    	    client.subscribe('/messages', function (message) {
    	    /****	Subscribe to do this function	******/
    		showMessage(JSON.parse(message.body));
    		
    	    });
    	    
    	});
        });
    
    $('#disconnect').click(function() {
    	if (client != null) {
    	    client.disconnect();
    	    setConnected(false);
    	}
    	client = null;
        });
    
    
    function setConnected(connected) {
    	$("#connect").prop("disabled", connected);
    	$("#disconnect").prop("disabled", !connected);
    	$("#send").prop("disabled", !connected);
    	$('#text').prop('disabled', !connected);
    	if (connected) {
    	    $("#conversation").show();
    	    $('#text').focus();
    	}
    	else $("#conversation").hide();
    	$("#messages").html("");
     }
    
    
    
    $('#send').click(function() {
    	
    if($('#text').val() != ""){
		client.send("/app/chat/", {}, JSON.stringify({text: $('#text').val()}));
		$('#text').val("");
		
    }
    
    $('#text').focus();
    
    });
    
    
    function getDateFormat(date) {
    	var d = new Date(date),
    	        month = '' + (d.getMonth() + 1),
    	        day = '' + d.getDate(),
    	        year = d.getFullYear(),
    	        hour = d.getHours(),
    	        minutes=d.getMinutes(),
    			seconds=d.getSeconds();

    	if (month.length < 2)
    	    month = '0' + month;
    	if (day.length < 2)
    	    day = '0' + day;
    	var date = new Date();
    	date.toLocaleDateString();

    	return [day, month, year,hour,minutes,seconds].join('-');
    	}
    	;
    	
});

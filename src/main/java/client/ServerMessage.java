package client;

import java.util.Date;
public class ServerMessage
{
    private String message;
    private Date time = new Date();

    public ServerMessage() {}

    public ServerMessage(String from,String message,String topic)
    {
	this.message = message;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public Date getTime()
    {
        return time;
    }

    public String toString()
    {
	return String
	    .format("{time: %1$-15d | mesg: %2$s}",
		  getTime().getTime(),  getMessage());
    }
}

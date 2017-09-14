package sample;

import java.util.Date;
public class OutputMessage
{
    private String message;
    private Date time = new Date();

    public OutputMessage() {}

    public OutputMessage(String from,String message)
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
}

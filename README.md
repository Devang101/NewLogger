React Log Viewer

The Log Viewer will be a simple and portable DOM container that will collect and display formatted log entries and messages for a web-application.

Requirements:
Centralized store with data-access API

The Log Viewer should provide:
	add_log_entry
		JSON input containing:
			Timestamp
			Event Type
			Event Severity
			Event Message
			JSON Output
			Success/Failure
			Log_entry_id
	remove_log_entry
		JSON input containing:
			Log_entry_id
			JSON output
			Success failure
	Get_log_entries
		No input
		Returns JSON array containing log_entry objects
	A DOM container
		Should be style-able with basic CSS (like height, width, font etc.)
	A “log_entry” component
		A templatable component that displays the information provided by the add_log_entry method described above.
		
Sample structure of a rendered log_entry could be:
<div class = ‘log_entry’><div class = ‘log_timestamp’>5/16/2016 12:03:44</div><div class = ‘log_event’>INFO - Saved File</div><div class = ‘log_message’>Successfully saved file to disk!</div></div>

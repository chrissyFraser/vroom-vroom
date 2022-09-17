---
Tasks:

[x] Install service_rest in service_project>settings.py
[x] Create Models, virtual objects, for service_rest
[x] Create urls.py file in service_rest
[x] Create encoders.py for models
[x] Create RESTful views for technicians.
[] Create RESTful views for appointments.
[] Create view for GET service history for specific VIN.


Service:
[] Create a form that allows a person to enter an automotive technician's name and employee number. When the form is submitted, the automotive technician is created in the application.

[] Also create a link in the navbar to get to the Enter a technician form.

[] Create a form that allows a service concierge to enter the vehicle's VIN, owner's name, the date and time of the appointment, the assigned technician, and a reason for the service appointment (like "oil change" or "routine maintenance"). When the form is submitted, the service appointment should be saved in the application.

[] Also create a link in the navbar to get to the Enter a service appointment form.

[] Create a list of scheduled appointments that contain the details collected in the form. VIN, customer name, date and time of the appointment, the assigned technician's name, and the reason for the service.

If the VIN of the automobile that is coming for an appointment was at one time in the inventory, give the customer "VIP treatment".

Each appointment in the list of appointments should have a button that allows the appointment to be marked canceled or finished. After being marked, it should no longer show up in the list of appointments.

[] Also create a link in the navbar to get to the list of appointments.
---
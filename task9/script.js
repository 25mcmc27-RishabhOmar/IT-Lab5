$(document).ready(function () {

    // JSON Structure
    var formJSON = {
        fields: [
            { label: "Full Name", type: "text", id: "name" },
            { label: "Email Address", type: "email", id: "email" },
            { label: "Password", type: "password", id: "password" },
            {
                label: "Country",
                type: "select",
                id: "country",
                options: ["Select", "India", "USA"]
            },
            {
                label: "Role",
                type: "select",
                id: "role",
                options: ["Select", "Student", "Employee"]
            }
        ]
    };

    // Build Form Dynamically
    $.each(formJSON.fields, function (index, field) {

        var html = "<div class='section'>";
        html += "<label>" + field.label + "</label>";

        if (field.type === "select") {

            html += "<select id='" + field.id + "'>";

            $.each(field.options, function (i, option) {
                html += "<option value='" + option + "'>" + option + "</option>";
            });

            html += "</select>";

        } else {

            html += "<input type='" + field.type + "' id='" + field.id + "' />";
        }

        html += "</div>";

        $("#formFields").append(html);
    });


    // Country Change Event
    $(document).on("change", "#country", function () {

        $("#stateSection").remove();

        var country = $(this).val();
        var states = [];

        if (country === "India") {

            states = [
                "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
                "Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
                "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
                "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
                "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
                "Uttar Pradesh","Uttarakhand","West Bengal",
                "Andaman and Nicobar Islands","Chandigarh",
                "Dadra and Nagar Haveli and Daman and Diu","Delhi",
                "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
            ];
        }

        if (country === "USA") {
            states = ["California","Texas","New York","Florida","Illinois"];
        }

        if (states.length > 0) {

            var stateHTML = "<div class='section' id='stateSection'>";
            stateHTML += "<label>State / Union Territory</label>";
            stateHTML += "<select id='state'>";
            stateHTML += "<option value=''>Select</option>";

            for (var i = 0; i < states.length; i++) {
                stateHTML += "<option>" + states[i] + "</option>";
            }

            stateHTML += "</select></div>";

            $("#formFields").append(stateHTML);
        }

    });


    // Role Change Event
    $(document).on("change", "#role", function () {

        $("#roleSection").remove();

        var role = $(this).val();
        var html = "";

        if (role === "Student") {
            html = "<div class='section' id='roleSection'>" +
                   "<label>College Name</label>" +
                   "<input type='text' id='college' />" +
                   "</div>";
        }

        if (role === "Employee") {
            html = "<div class='section' id='roleSection'>" +
                   "<label>Company Name</label>" +
                   "<input type='text' id='company' />" +
                   "</div>";
        }

        $("#formFields").append(html);
    });


    // Form Validation
    $("#dynamicForm").submit(function (e) {

        e.preventDefault();
        $(".error").remove();
        var valid = true;

        function showError(id, message) {
            $("#" + id).after("<span class='error'>" + message + "</span>");
            valid = false;
        }

        if ($("#name").val().trim() === "") showError("name", "Name required");
        if ($("#email").val().trim() === "") showError("email", "Email required");
        if ($("#password").val().length < 6) showError("password", "Minimum 6 characters");
        if ($("#country").val() === "Select") showError("country", "Select country");
        if ($("#state").length && $("#state").val() === "") showError("state", "Select state");
        if ($("#role").val() === "Select") showError("role", "Select role");
        if ($("#college").length && $("#college").val().trim() === "") showError("college", "Enter college name");
        if ($("#company").length && $("#company").val().trim() === "") showError("company", "Enter company name");

        if (valid) {
            alert("Registration Successful!");
        }

    });

});
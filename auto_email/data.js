const data = {
    "message": "Errors/Warnings from last 24 hr for the device fetched successfully",
    "success": true,
    "data": [
        {
            "errorCode": "4009",
            "count": 15,
            "message": "Motor Stopped due to Overload",
            "lasttime": "2025-02-24 14:27:45",
            "causes": ["Conveyor motor is consuming heavy power"],
            "remedies": ["Contact – service@ishitva.in"]
        },
        {
            "errorCode": "W1003",
            "count": 10,
            "message": "Image Grab time out",
            "lasttime": "2025-02-24 14:27:46",
            "causes": ["Conveyor belt not working", "vision and Encoder are not in sync"],
            "remedies": ["Contact – service@ishitva.in"]
        },
        {
            "errorCode": "W4020",
            "count": 4,
            "message": "System Critical: CPU Temperature",
            "lasttime": "2025-02-24 12:59:37",
            "causes": ["Internal cooling system of Single Phase Panel is not working", "Verify the amount of heat in the area surrounding the single phase panel"],
            "remedies": ["Contact – service@ishitva.in"]
        },
        {
            "errorCode": "W4027",
            "count": 4,
            "message": "Acceleration - Conveyor Ampere in Warning State",
            "lasttime": "2025-02-24 08:29:27",
            "causes": [
                "Ampere levels during acceleration are close to the acceptable limit.",
                "Possible minor motor, drive system, or electrical issue.",
                "Sensor calibration or configuration may need adjustment."
            ],
            "remedies": [
                "Regularly monitor the motor and drive system performance.",
                "Check and secure all electrical connections.",
                "Ensure the sensors are properly calibrated and functioning correctly.",
                "Review operational settings to prevent further warnings.",
                "If the issue escalates, contact support for assistance.",
                "Contact – service@ishitva.in"
            ]
        }
    ]
};

module.exports = data


const ORIGIN_HOST = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://api.queen-of-time.com"

const DEFAULT_API_HOST = `${ORIGIN_HOST}/api/v1`
console.log(process.env.NODE_ENV)
//----------------get--------------------

export const employeesList = 
`${DEFAULT_API_HOST}/employees`

export const submittedShiftList = (period) =>
`${DEFAULT_API_HOST}/organizations/employees_shifts?period[]=${period[0]}&period[]=${period[1]}`

export const shiftPath = `${DEFAULT_API_HOST}/employees/shifts`

export const myShifts = (period) =>
`${DEFAULT_API_HOST}/employees/shifts?period[]=${period[0]}&period[]=${period[1]}`



export const unapprovedShifts =
`${DEFAULT_API_HOST}/organizations/employees_unapproved_shifts`


export const assignMember = (date) => 
`${DEFAULT_API_HOST}/employees/shifts/assign_member/${date}`


export const calendarList =  
`${DEFAULT_API_HOST}/organizations/calendars`


export const manageAttendance = 
`${DEFAULT_API_HOST}/organizations/manage_timestamps`


export const attendanceList = 
`${DEFAULT_API_HOST}/employees/timestamps`


export const notificationList =  
`${DEFAULT_API_HOST}/employees/notifications`


export const initialNotifications = 
`${DEFAULT_API_HOST}/employees/initial_notifications`


export const allNotifications = 
`${DEFAULT_API_HOST}/employees/notifications/all_notifications`



export const timestampStandby =
`${DEFAULT_API_HOST}/employees/timestamps/new`


export const roomList = 
`${DEFAULT_API_HOST}/rooms`


export const inviteEmployees = 
`${DEFAULT_API_HOST}/rooms/invite_employees`


export const messageList = (room_id) =>
`${DEFAULT_API_HOST}/rooms/${room_id}/messages`


export const newProfile =
`${DEFAULT_API_HOST}/profile_setting`


export const newOrgConfig =
`${DEFAULT_API_HOST}/org_config_setting`



export const taskList = 
`${DEFAULT_API_HOST}/organizations/tasks`




//----------------post-------------------


export const newSession =
`${DEFAULT_API_HOST}/login`


export const newEmployee = 
`${DEFAULT_API_HOST}/employees`

export const newOrganization = 
`${DEFAULT_API_HOST}/organizations`

export const newCalendar = 
`${DEFAULT_API_HOST}/organizations/calendars`

export const newShifts =
`${DEFAULT_API_HOST}/employees/shifts/new`

export const submitShifts =
`${DEFAULT_API_HOST}/employees/shifts/submit_shifts`



export const newTimestamp =  
`${DEFAULT_API_HOST}/employees/timestamps`


export const newNotification = 
`${DEFAULT_API_HOST}/employees/notifications`


export const newMessage =
`${DEFAULT_API_HOST}/messages`


export const assign =
`${DEFAULT_API_HOST}/employees/shifts/assign`




//----------------patch-------------------

export const modulateTimestamp = 
`${DEFAULT_API_HOST}/employees/timestamps/modulate_timestamps`


export const approveTimestamp =
`${DEFAULT_API_HOST}/timestamps/approve`


export const updateCalendar = (eventId) => 
`${DEFAULT_API_HOST}/organizations/calendars/${eventId}`

export const updateNotification =
`${DEFAULT_API_HOST}/employees/notifications/update_notification_read`


export const determineShift =
`${DEFAULT_API_HOST}/employees/shifts/determine_shifts`


export const updateProfile =
`${DEFAULT_API_HOST}/update_profile`


export const updateOrgConfig =
`${DEFAULT_API_HOST}/update_org_config`


export const updateTask =
`${DEFAULT_API_HOST}/organizations/tasks/update_tasks`



//----------------delete-------------------


export const removeEmployee = (Id) => 
`${DEFAULT_API_HOST}/employees/${Id}`



export const removeSession =
`${DEFAULT_API_HOST}/logout`


export const deleteCalendar = (Id) => 
`${DEFAULT_API_HOST}/organizations/calendars/${Id}`


export const removeShift = (Id) => 
`${DEFAULT_API_HOST}/employees/shifts/${Id}`


export const removeMessage = (room_id, id) => 
`${DEFAULT_API_HOST}/rooms/${room_id}/messages/${id}`






//---------------------------------
export const currentSession = 
`${DEFAULT_API_HOST}/check_session`



class Notification < ApplicationRecord
    default_scope -> { order(created_at: :desc) }
    scope :all_notifications, -> (employee_id){where(received_employee: employee_id).order(:read)}
    scope :unread, -> {where(read: false)}
    scope :recent, -> (employee_id){where(read: false, received_employee: employee_id).limit(15)}

    belongs_to :employee
end

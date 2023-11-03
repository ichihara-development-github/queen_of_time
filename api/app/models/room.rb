class Room < ApplicationRecord

    has_many :messages, dependent: :destroy
    has_many :employee_rooms,  dependent: :destroy
    has_many :employees, through: :employee_rooms

    # belongs_to :chief, class_name: "Employee"
    # errormessage
    validates :employees, length: { maximum: 2 }

    def companion(employee)
        self.employees.where.not(id: employee.id)[0]
    end

end
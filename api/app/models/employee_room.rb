class EmployeeRoom  < ApplicationRecord
    belongs_to :employee
    belongs_to :room
end
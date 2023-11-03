class Organization < ApplicationRecord
    acts_as_paranoid

    has_many :employees
    has_many :shifts, through: :employees,  dependent: :destroy
    has_many :timestamps, through: :employees
    has_many :calendars,  dependent: :destroy
    has_one :configure,  dependent: :destroy
    has_many :taskcards

end
class Shift < ApplicationRecord

    belongs_to :employee, optional: true
    has_one :organization

    validates :date, uniqueness: { scope: :employee }

    scope :assigned_member_ids, -> (date){Shift.where(date: date).pluck(:employee_id)}
    scope :attend, -> {where.not(rest: true)}
    scope :this_month, -> {
        where("date >= ?", Time.zone.today.beginning_of_month)
    }
    scope :selected_month, -> (year, month){
        targetday = Date.new(year.to_i,month.to_i,1)
        where(date: targetday..targetday.end_of_month)
    }
    scope :from_last_year, -> {where("date >= ?", Time.zone.today.prev_year.beginning_of_year)}
    # scope :active, -> { where(active: true) }

end
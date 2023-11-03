class Message < ApplicationRecord
    acts_as_paranoid

    belongs_to :room
    has_one :employee, through: :rooms

end

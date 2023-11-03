class CreateCalendars < ActiveRecord::Migration[5.2]
  def change
    create_table :calendars do |t|
      t.references :organization
      t.string :title
      t.date :start
      t.string :end
      t.string :date
      t.text :description
      t.string :color
      t.timestamps
    end
  end
end

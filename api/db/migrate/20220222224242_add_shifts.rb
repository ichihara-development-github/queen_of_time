class AddShifts < ActiveRecord::Migration[5.2]

  def change
    create_table :shifts do |t|
      t.references :employee
      t.string :name, null: false
      t.date :date, null: false
      t.float :attendance_time
      t.float :leaving_time
      t.text :comment
      t.boolean :rest, default: false
      t.boolean :confirmed, default: false
      t.timestamps
    end
    
  end
end

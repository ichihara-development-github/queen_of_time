class AddEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.references :organization
      t.string :name, null:false, default: "sample"
      t.string :image
      t.boolean :chief, default: false
      t.boolean :admin, default: false
      t.datetime :deleted_at
      t.timestamps
    end

    create_table :profiles do |t|
      t.references :employee, null: false, forgin_key: true
      t.string :telephone, null: false, default: "090-0000-0000"
      t.string :address, null: false, default: "Osaka"
      t.integer :age
      t.string :email, null: false
      t.string :password_digest, null: false
    end


    create_table :organizations do |t|
      t.string :name, null: false
      t.string :address, null: false, default: "Tyokyo"
      t.float :lat, default: 35.6815171
      t.float :lng, default: 139.7567439
      t.datetime :deleted_at
      t.timestamps
    end

    create_table :configures do |t|
      t.references :organization, null: false, forgin_key: true
      t.integer :open, null: false, default: 9
      t.integer :close, null: false, default: 18
      t.integer :min_work_time, default: 1
      t.date :submittable_start, null: false, default: Date.today()
      t.date :submittable_end, null: false, default: Date.today() + 7
      t.integer :stampable_distance, default: 80
      t.string :red, default: "商談"
      t.string :royalblue, default: "面接"
      t.string :green, default: "会議"
      t.string :orange, default: "研修"
      t.timestamps
    end
  end
end

class CreateWells < ActiveRecord::Migration[5.2]
  def change
    create_table :wells do |t|
      t.string :wellID
      t.float :rodHeight
      t.float :corrected
      t.string :camlock
      t.float :depthToWater
      t.float :gwe
      t.float :gse
      t.text :notes
      t.float :lat
      t.float :long
      t.float :amslElev
      t.float :cpRod
      t.references :survey, foreign_key: true

      t.timestamps
    end
  end
end

## members_table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## users_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|e-mail|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members


## messages_table
|Coulumn|Type|Options|
|-------|----|-------|
|body|text||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groups_table
|Coulumn|Type|Options|
|-------|----|-------|
|name|string|null :false|

### Association
- has_many :messages
- has_many :users, through: :members
- has_many :members

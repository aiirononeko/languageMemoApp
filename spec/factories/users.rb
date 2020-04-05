FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    username { Faker::Internet.user_name(specifier: 'Nancy') }
    password { Faker::Internet.password(min_length: 8) }
  end
  
  factory :confirmed_user, class: User do
    name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    username { Faker::Internet.user_name(specifier: 'Nancy') }
    password { Faker::Internet.password(min_length: 8) }
    confirmed_at { Time.now - 100}
  end
end

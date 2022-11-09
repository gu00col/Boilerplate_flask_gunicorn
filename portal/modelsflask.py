# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class Acces(db.Model):
    __tablename__ = 'access'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))



class ActiveSession(db.Model):
    __tablename__ = 'active_sessions'

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Text)
    users_id = db.Column(db.ForeignKey('users.id'), nullable=False, index=True)
    created_at = db.Column(db.DateTime)
    expire_in = db.Column(db.DateTime)
    active = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())

    users = db.relationship('User', primaryjoin='ActiveSession.users_id == User.id', backref='active_sessions')



class CustomerTimeline(db.Model):
    __tablename__ = 'customer_timeline'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    customer_users_id = db.Column(db.Integer, nullable=False)
    user = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    event_date = db.Column(db.DateTime)
    send = db.Column(db.Integer, server_default=db.FetchedValue())
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    type = db.Column(db.Enum('system', 'prospection'), nullable=False)



class CustomerUser(db.Model):
    __tablename__ = 'customer_users'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)
    first_login = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    onboarding = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    cell = db.Column(db.String(11))
    active = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    recommendation = db.Column(db.String(255))
    welcome_mail = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    observation = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    updated_at = db.Column(db.DateTime)



class CustomerUsersDatum(db.Model):
    __tablename__ = 'customer_users_data'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    customer_users_id = db.Column(db.Integer, nullable=False, index=True)
    enterprise_data_id = db.Column(db.Integer, nullable=False, unique=True)



class CustormerDatum(db.Model):
    __tablename__ = 'custormer_data'

    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    customer_users_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    document = db.Column(db.String(11), primary_key=True, nullable=False, unique=True)
    id_number = db.Column(db.String(45), nullable=False)
    gender = db.Column(db.Enum('masculino', 'feminino', 'não declarar'), nullable=False, server_default=db.FetchedValue())
    birthday = db.Column(db.Date, nullable=False)
    website = db.Column(db.String(255))
    nationality = db.Column(db.String(255), nullable=False)
    postal_code = db.Column(db.String(8), nullable=False)
    adress = db.Column(db.String(255), nullable=False)
    complement = db.Column(db.String(255))
    district = db.Column(db.String(255), nullable=False)
    number = db.Column(db.String(45), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    phone = db.Column(db.String(11))
    cell = db.Column(db.String(11))
    whatsapp = db.Column(db.String(11))
    marital_status = db.Column(db.Enum('casado', 'solteiro', 'separado', 'divorciado', 'viúvo', 'união estavel', 'não declarar'), nullable=False, server_default=db.FetchedValue(), info="enum('casado', 'solteiro', 'separado', 'divorciado', 'viúvo', 'união estavel')")
    profession = db.Column(db.String(255), nullable=False)



class EnterpriseAccountable(db.Model):
    __tablename__ = 'enterprise_accountable'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    document = db.Column(db.String(11), nullable=False)
    id_number = db.Column(db.String(45), nullable=False)
    gender = db.Column(db.Enum('masculino', 'feminino', 'não declarar'), nullable=False, server_default=db.FetchedValue())
    birthday = db.Column(db.Date, nullable=False)
    nationality = db.Column(db.String(255), nullable=False)
    postal_code = db.Column(db.String(8), nullable=False)
    adress = db.Column(db.String(255), nullable=False)
    district = db.Column(db.String(255), nullable=False)
    number = db.Column(db.String(45), nullable=False)
    complement = db.Column(db.String(255))
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    phone = db.Column(db.String(11))
    cell = db.Column(db.String(11))
    whatsapp = db.Column(db.String(11))
    marital_status = db.Column(db.Enum('casado', 'solteiro', 'separado', 'divorciado', 'viúvo', 'união estavel', 'não declarar'), nullable=False, server_default=db.FetchedValue(), info="enum('casado', 'solteiro', 'separado', 'divorciado', 'viúvo', 'união estavel')")
    profession = db.Column(db.String(255), nullable=False)
    enterprise_data_id = db.Column(db.Integer, nullable=False, index=True)



class EnterpriseDatum(db.Model):
    __tablename__ = 'enterprise_data'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    document = db.Column(db.String(14), nullable=False, unique=True)
    ie_number = db.Column(db.String(45), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    website = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    adress = db.Column(db.String(255), nullable=False)
    number = db.Column(db.String(45), nullable=False)
    complement = db.Column(db.String(255))
    district = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    phone = db.Column(db.String(14))
    cell = db.Column(db.String(14), nullable=False)
    whatsapp = db.Column(db.String(14), nullable=False)
    customer_id = db.Column(db.Integer, nullable=False)



class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False, server_default=db.FetchedValue())
    percentage = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    type = db.Column(db.Enum('lancamento', 'business', 'website', 'social_midia', 'estudio'), nullable=False)



class Proposal(db.Model):
    __tablename__ = 'proposal'
    __table_args__ = (
        db.Index('fk_proposal_customer_users1_idx', 'customer_users_id', 'customer_users_email'),
    )

    id = db.Column(db.Integer, primary_key=True, unique=True)
    customer_users_id = db.Column(db.Integer, nullable=False)
    customer_users_email = db.Column(db.String(255))
    proposal_date = db.Column(db.Date, nullable=False)
    observation = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    status = db.Column(db.Enum('open', 'sended', 'accepted', 'rejected', 'counter-proposal', 'inactive'), nullable=False, server_default=db.FetchedValue())



class ProposalItem(db.Model):
    __tablename__ = 'proposal_items'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    proposal_id = db.Column(db.Integer, nullable=False, index=True)
    final_price = db.Column(db.Numeric(10, 2), nullable=False, server_default=db.FetchedValue())
    final_percentage = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    products_id = db.Column(db.Integer, nullable=False, index=True)



class ProposalResponse(db.Model):
    __tablename__ = 'proposal_response'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    proposal_id = db.Column(db.Integer, nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    accepted = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    reason = db.Column(db.String(45))
    products_id = db.Column(db.Integer, nullable=False, index=True)



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_login = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    avatar = db.Column(db.LONGBLOB)
    employee = db.Column(db.Integer, nullable=False)
    employee_id = db.Column(db.Integer)
    token = db.Column(db.String(255))
    position = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.FetchedValue())
    updated_at = db.Column(db.DateTime)
    active = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())



class UsersAcces(db.Model):
    __tablename__ = 'users_access'

    id = db.Column(db.Integer, primary_key=True)
    access_id = db.Column(db.ForeignKey('access.id'), nullable=False, index=True)
    users_id = db.Column(db.ForeignKey('users.id'), nullable=False, index=True)

    access = db.relationship('Acces', primaryjoin='UsersAcces.access_id == Acces.id', backref='users_access')
    users = db.relationship('User', primaryjoin='UsersAcces.users_id == User.id', backref='users_access')

import crypto, { createHash } from "crypto"

const {PERSISTENCE}=process.env
class UsersDTO{
    constructor(data){
        if(PERSISTENCE!=="mongo"){
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.name = data.name
        this.date = data.date
        this.city = data.city
        this.email = data.email
        this.password = createHash(data.password)
        this.avatar = data.avatar || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
        this.role = data.role || "USER"
        if(PERSISTENCE!=="mongo"){
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}
export default UsersDTO
import fs from 'fs';


class DaoFs{
    constructor(rutaArchivo, model){
        this.model=model
        this.path=rutaArchivo
    }
    //funciones
    async _readFile() {
        if (fs.existsSync(this.path)) {
        const content = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(content);
        }
        return [];
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    }
//---------------------------------
    createOne = async (data) => {
        const items = await this._readFile();
        let id = items.length > 0 ? Math.max(...items.map(i => i.id || 0)) + 1 : 1;
        const newItem = { id, ...data };
        items.push(newItem);
        await this._writeFile(items);
        return newItem;
    };
    readAll = async () => await this._readFile();
    readById = async (id) => {
        const items = await this._readFile();
        return items.find(i => i.id === Number(id)) || null;
    };
    //no existen para esta persistencia:
        readByIdMongoose = async () => {
            throw new Error("readByIdMongoose no está disponible en FileSystem DAO");
        }
        readByIdWithPopulate = async () => {
            throw new Error("readByIdWithPopulate no está disponible en FileSystem DAO");
        }
    updateById = async (id, data) => {
        const items = await this._readFile();
        const index = items.findIndex(i => i.id === Number(id));
        if (index === -1) return null;
        items[index] = { ...items[index], ...data, id: Number(id) };
        await this._writeFile(items);
        return items[index];
    };    
    destroyById = async (id) => {
        let items = await this._readFile();
        const filtered = items.filter(i => i.id !== Number(id));
        await this._writeFile(filtered);
        return filtered;
    };
}   

const productsManager = new DaoFs(Product);
const cartsManager = new DaoFs(Cart);
const usersManager = new DaoFs(User);

export { productsManager, cartsManager, usersManager };
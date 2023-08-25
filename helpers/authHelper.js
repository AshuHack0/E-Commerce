import bcrypt from 'bcrypt';

export const hashPassword = async(passowrd) => {
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(passowrd, saltRound);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async(password, hashedPassword) => {

    return bcrypt.compare(password, hashedPassword);

};
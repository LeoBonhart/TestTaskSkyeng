
interface IConfig{
    medium: number;
    large: number;
}

export class ViewportConfig implements IConfig {
    /**
     * ### Среднее значение ширины
     *
     * По умолчанию 992
     */
    private _medium: number = 992;
    /**
     * ### Среднее значение ширины
     *
     * По умолчанию 992
     */
    public get medium(): number {
        return this._medium;
    }
    /**
     * ### Среднее значение ширины
     *
     * По умолчанию 992
     */
    public set medium(v: number) {
        this._medium = v;
    }

    /**
     * ### Большое значение ширины
     *
     * По умолчанию 1200
     */
    private _large: number = 1200;
    /**
     * ### Большое значение ширины
     *
     * По умолчанию 1200
     */
    public get large(): number {
        return this._large;
    }
    /**
     * ### Большое значение ширины
     *
     * По умолчанию 1200
     */
    public set large(v: number) {
        this._large = v;
    }
}

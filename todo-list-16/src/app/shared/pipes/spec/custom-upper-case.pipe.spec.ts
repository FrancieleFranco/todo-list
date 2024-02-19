import { CustomUpperCasePipe } from '../custom-upper-case.pipe';

describe('CustomUpperCasePipe', () => {
  const customUpperCasePipe = new CustomUpperCasePipe();

  it('should retun Angular', () => {
    const textTransformed = customUpperCasePipe.transform('angular test');
    expect(textTransformed).toEqual('ANGULAR TEST');
  });

  it("should retun 'ANGULAR' 16'", () => {
    const textTransformed = customUpperCasePipe.transform('ANGULAR 16');
    expect(textTransformed).toEqual('ANGULAR 16');
  });
});

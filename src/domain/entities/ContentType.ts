class ContentType {
  static SOCIAL_POST = "social_post";
  static EMAIL = "email";
  static PRODUCT_DESCRIPTION = "product_description";

  static getValidTypes() {
    return [
      ContentType.SOCIAL_POST,
      ContentType.EMAIL,
      ContentType.PRODUCT_DESCRIPTION,
    ];
  }

  static isValid(type: string): boolean {
    return ContentType.getValidTypes().includes(type);
  }
}

export default ContentType;

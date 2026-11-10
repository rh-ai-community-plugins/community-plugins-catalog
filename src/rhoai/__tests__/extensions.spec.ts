import {
  communityPluginsCatalogAreaExtension,
  communityPluginsSectionExtension,
  communityPluginsCatalogSectionExtension,
  catalogNavExtension,
  installedNavExtension,
  communityPluginsCatalogRouteExtension,
  extensions,
} from '../extensions';

describe('RHOAI Plugin Extensions', () => {
  describe('communityPluginsCatalogAreaExtension', () => {
    it('should have the correct type and id', () => {
      expect(communityPluginsCatalogAreaExtension.type).toBe('app.area');
      expect(communityPluginsCatalogAreaExtension.properties.id).toBe('community-plugins-catalog');
    });

    it('should have an empty featureFlags array', () => {
      expect(communityPluginsCatalogAreaExtension.properties.featureFlags).toEqual([]);
    });
  });

  describe('communityPluginsSectionExtension', () => {
    it('should define the community-plugins section', () => {
      expect(communityPluginsSectionExtension.type).toBe('app.navigation/section');
      expect(communityPluginsSectionExtension.properties.id).toBe('community-plugins');
      expect(communityPluginsSectionExtension.properties.title).toBe('Community plugins');
      expect(communityPluginsSectionExtension.properties.group).toBe('9_plugins');
    });

    it('should have an iconRef function', () => {
      expect(typeof communityPluginsSectionExtension.properties.iconRef).toBe('function');
    });
  });

  describe('communityPluginsCatalogSectionExtension', () => {
    it('should define a subsection nested under community-plugins', () => {
      expect(communityPluginsCatalogSectionExtension.type).toBe('app.navigation/section');
      expect(communityPluginsCatalogSectionExtension.properties.id).toBe('community-plugins-catalog');
      expect(communityPluginsCatalogSectionExtension.properties.title).toBe('Community Plugins Catalog');
      expect(communityPluginsCatalogSectionExtension.properties.group).toBe('1_community_plugins_catalog');
      expect(communityPluginsCatalogSectionExtension.properties.section).toBe('community-plugins');
      expect(typeof communityPluginsCatalogSectionExtension.properties.iconRef).toBe('function');
    });
  });

  describe('navigation extensions', () => {
    it('should define Catalog nav item under community-plugins-catalog section', () => {
      expect(catalogNavExtension.type).toBe('app.navigation/href');
      expect(catalogNavExtension.properties.id).toBe('community-plugins-catalog-catalog');
      expect(catalogNavExtension.properties.title).toBe('Catalog');
      expect(catalogNavExtension.properties.href).toBe('/community-plugins-catalog/catalog');
      expect(catalogNavExtension.properties.section).toBe('community-plugins-catalog');
      expect(catalogNavExtension.properties.path).toBe('/community-plugins-catalog/catalog/*');
    });

    it('should define Installed nav item under community-plugins-catalog section', () => {
      expect(installedNavExtension.type).toBe('app.navigation/href');
      expect(installedNavExtension.properties.id).toBe('community-plugins-catalog-installed');
      expect(installedNavExtension.properties.title).toBe('Installed');
      expect(installedNavExtension.properties.href).toBe('/community-plugins-catalog/installed');
      expect(installedNavExtension.properties.section).toBe('community-plugins-catalog');
      expect(installedNavExtension.properties.path).toBe('/community-plugins-catalog/installed/*');
    });
  });

  describe('route extension', () => {
    it('should define a single wildcard route with lazy component', () => {
      expect(communityPluginsCatalogRouteExtension.type).toBe('app.route');
      expect(communityPluginsCatalogRouteExtension.properties.path).toBe('/community-plugins-catalog/*');
      expect(typeof communityPluginsCatalogRouteExtension.properties.component).toBe('function');
      expect(communityPluginsCatalogRouteExtension.properties.component()).toBeInstanceOf(Promise);
    });
  });

  describe('extensions array', () => {
    it('should contain all six extensions', () => {
      expect(extensions).toHaveLength(6);
    });

    it('should include all extensions in the correct order', () => {
      expect(extensions).toEqual([
        communityPluginsSectionExtension,
        communityPluginsCatalogAreaExtension,
        communityPluginsCatalogSectionExtension,
        catalogNavExtension,
        installedNavExtension,
        communityPluginsCatalogRouteExtension,
      ]);
    });
  });
});

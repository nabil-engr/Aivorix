import { DefaultUrlSerializer, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    // Separate path from query and fragment
    const [pathAndQuery, fragment] = url.split("#");
    const [path, query] = pathAndQuery.split("?");

    // Strip trailing slashes from path for routing (keep root '/')
    let cleanPath = path;
    while (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    // Reconstruct normalized URL for Angular's route matcher
    const normalizedUrl =
      cleanPath +
      (query !== undefined ? `?${query}` : "") +
      (fragment !== undefined ? `#${fragment}` : "");

    return super.parse(normalizedUrl);
  }

  override serialize(tree: UrlTree): string {
    const raw = super.serialize(tree);
    const [pathAndQuery, fragment] = raw.split("#");
    const [path, query] = pathAndQuery.split("?");

    // Ensure path has a trailing slash for HTML links, unless it has a file extension (.xml, .json, .txt, etc.)
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(path);
    let withSlash = path;
    if (path.length > 0 && !path.endsWith("/") && !hasExtension) {
      withSlash = `${path}/`;
    }

    return (
      withSlash +
      (query !== undefined ? `?${query}` : "") +
      (fragment !== undefined ? `#${fragment}` : "")
    );
  }
}

